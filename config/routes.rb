FEDs::Application.routes.draw do
  get "invites/new"

  get "invites/create"

  get "invites/validate"

  get "index/index"

  devise_for :users

  root :to => "posts#index"

  resource :posts, :invites

  match '/page/:start'=>'index#index',:start=>/\d+/,:defaults=>{:start=>0}, :as => :posts_page

  match '/posts/new/:parent_id' => 'posts#new', :defaults => {:parent_id => false}, :as => :new_post_with_parent

  match '/posts/search' => 'posts#search', :as => :search_posts, :method=>:post

  match '/posts/search/:search' => 'posts#search', :as => :search_posts_by_value, :method=>:get

  match '/posts/mark/:post_id' => 'posts#mark', :method => :get

  match '/posts/mark/' => 'posts#mark', :method=>:post, :post_id => /.+/

  match '/posts/unmark/:post_id' => 'posts#unmark', :method => :get

  match '/posts/unmark/' => 'posts#unmark', :method=>:post, :post_id => /.+/ 

  match '/invites/validate/:email/:key' => 'invites#validate'

  match '/posts/:id' => 'posts#show', :as => :open_post
  # The priority is based upon order of creation:
  #
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
