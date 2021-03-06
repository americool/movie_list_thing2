class MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :update, :destroy]

  # GET /movies
  def index
    @movies = Movie.all

    render json: @movies
  end

  # GET /movies/1
  def show
    render json: @movie
  end

  def get_rating
    @movie = Movie.where(imdbid: params[:movie][:imdbid]).first
    if @movie.present?
      render json: @movie.rating
    end
  end


  # POST /movies
  def create
    existingmovie = Movie.where(imdbid: params[:movie][:imdbid]).first
    if existingmovie.present?
      render json: existingmovie
    else
      @movie = Movie.new(movie_params)

      if @movie.save
        render json: @movie, status: :created, location: @movie
      else
        render json: @movie.errors, status: :unprocessable_entity
      end
    end
  end

  def change_lists
    movie = Movie.where(imdbid: params[:imdbid]).first
    movie.change_lists(params[:lists])
    movie.save
    movie.update(rating: params[:rating])
 end

  def imdb_by_id
     id = params[:imdbid]
     @res = HTTParty.get("http://www.omdbapi.com/?apikey="+ ENV["IMDBKEY"] + "&i=" + id)
     render json: @res;
  end

  def imdb_by_title
     title =params[:title]
     @res = HTTParty.get("http://www.omdbapi.com/?apikey="+ ENV["IMDBKEY"] + "&t=" + title)
     render json: @res;
  end
  # PATCH/PUT /movies/1
  def update
    if @movie.update(movie_params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    @movie.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      @movie = Movie.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def movie_params
      params.require(:movie).permit(:title, :imdbid, :list_id, :rating)
    end
end
