from http.server import HTTPServer, BaseHTTPRequestHandler

HOST = "10.24.76.136"
PORT = 9999

class NeuralHTTP(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type","text/html")
        self.end_headers()
        
        self.wfile.write(bytes("<html><body><h1>Hello World!</h1></body></html>","utf-8"))
         
server = HTTPServer((HOST,PORT),NeuralHTTP)

print("Server now running..")
server.serve_forever()
server.serve_close()
print("Server Stopped")
        
