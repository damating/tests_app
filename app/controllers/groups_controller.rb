class GroupsController < BaseController
  def index
    render json: Group.all.order(:name)
  end

  def create
    render json: Group.create(group_params)
  end

  def destroy
    render json: Group.destroy(params[:id])
  end

  def update
    group = Group.find(params["id"])
    group.update_attributes(group_params)
    respond_with group, json: group
  end

  private

  def group_params
    params.require(:group).permit(:id, :name, :description)
  end
end
