import time
import subprocess
import glob
import os
import csv

detect_script = 'yolov5/detect.py'
input_path = 'yolov5/data/images'

latest_image = max(glob.glob(os.path.join(input_path, "*.jpg")), key=os.path.getctime)

command = f'python3 {detect_script} --weights yolov5s.pt --img 416 --conf-thres 0.4 --source {latest_image} --view-img --save-txt --save-conf'

interval = 30

while True:
    subprocess.call(command, shell=True)
    print("File Created")
    
    runs_dir = "yolov5/runs/detect/"
    latest_run_folder = max(glob.glob(os.path.join(runs_dir, "exp*")), key=os.path.getctime)
    labels_folder_path = os.path.join(latest_run_folder, "labels")
    txt_file_path = max(glob.glob(os.path.join(labels_folder_path, "*.txt")), key=os.path.getctime)
    
    with open(txt_file_path, "r") as f:
        lines = f.readlines()
    
    coordinates = []
    for line in lines:
        line = line.strip().split()
        class_index = int(line[0])
        x_center = float(line[1])
        y_center = float(line[2])
        coordinates.append((x_center, y_center))
        
    for coordinate in coordinates:
        x_center, y_center = coordinate
        print("x_center:", x_center)
        print("y_center:", y_center)
        

    
    roi_ranges = {
        "parking_lot_1": [(x_min_1, x_max_1), (y_min_1, y_max_1)],
        "parking_lot_2": [(x_min_2, x_max_2), (y_min_2, y_max_2)],
        "parking_lot_3": [(x_min_3, x_max_3), (y_min_3, y_max_3)],
        "parking_lot_4": [(x_min_4, x_max_4), (y_min_4, y_max_4)],
        "parking_lot_5": [(x_min_5, x_max_5), (y_min_5, y_max_5)],
        "parking_lot_6": [(x_min_6, x_max_6), (y_min_6, y_max_6)],
        "parking_lot_7": [(x_min_7, x_max_7), (y_min_7, y_max_7)],
        "parking_lot_8": [(x_min_8, x_max_8), (y_min_8, y_max_8)],
    }
    

    parking_lot_status = {}
    
    
    for roi_name in roi_ranges.keys():
        parking_lot_status[roi_name] = True

    for center_x, center_y in coordinates:
        for roi_name, roi_range in roi_ranges.items():
            x_range, y_range = roi_range
            x_min, x_max = x_range
            y_min, y_max = y_range
            if x_min <= center_x <= x_max and y_min <= center_y <= y_max:
                parking_lot_status[roi_name] = False
                break
            

    save_destination = "/ParkingLotOUTPUT/parking_lot_status.csv"
    
    with open(save_destination, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Parking Lot", "Status"])  # Write the header row

        for lot, status in parking_lot_status.items():
            writer.writerow([lot, "Open" if status else "Closed"])
        
    time.sleep(interval)