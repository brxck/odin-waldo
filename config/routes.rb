Rails.application.routes.draw do
  root "pictures#first"

  get "pictures", to: "pictures#index"
  get "pictures/:id", to: "pictures#show", as: "picture"

  post "pictures/:id/search", to: "people#search"
end
