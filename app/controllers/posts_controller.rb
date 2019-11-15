class PostsController < ApplicationController
  def index
  end
  
  def getData
    @post = Post.all
    render json: @post
  end
end
