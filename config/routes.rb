Rails.application.routes.draw do
  root "pictures#first"
  resources :pictures
end
