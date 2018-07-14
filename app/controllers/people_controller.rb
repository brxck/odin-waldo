class PeopleController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :search

  def search
    picture = Picture.find(params[:id])
    @person = picture.people.where(
      ":x > x0 and :x < x1 and :y > y0 and :y < y1",
      x: params[:person][:x], y: params[:person][:y]
    ).first
    found = @person ? true : false
    remaining = picture.people.where(found: false).map(&:name)

    @response = {
      found: found,
      person: {
        x0: @person.x0,
        y0: @person.y0,
        x1: @person.x1,
        y1: @person.y1,
        name: @person.name
      },
      remaining: remaining
    }

    respond_to do |format|
      format.json { render json: @response }
    end
  end
end
