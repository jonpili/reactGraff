class PostsController < ApplicationController
  def index
    @post = Post.all
    render json: @post
  end

  def create
    post = Post.new(post_params)
    post.save!
  end

  private

  def post_params
    params.require(:post).permit(:name, :description)
  end
end
