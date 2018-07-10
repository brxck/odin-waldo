Rails.application.routes.draw do
  root "pictures#show", id: "1"
  resources :pictures
end
