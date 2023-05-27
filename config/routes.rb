Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :parking_spaces do
        collection do
          post :find_id
          post :find_by_password
        end
      end
    end
  end
end
