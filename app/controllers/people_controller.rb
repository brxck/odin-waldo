class PeopleController < ApplicationController
  def search
    picture = Picture.find(params[:id])
    @person = picture.people.where(
      ":x > x0 and :x < x1 and :y > y0 and :y < y1",
      x: params[:person][:x], y: params[:person][:y]
    )

    respond_to do |format|
      format.json { render json: @person }
    end
  end
end
