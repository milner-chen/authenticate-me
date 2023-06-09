class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render json: @user
      render :show
    else
      # status will show error message on console
      render json: { errors: @user.errors.full_messages }, status: 422#:unprocessable_entity
    end
    # render json: user_params
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
