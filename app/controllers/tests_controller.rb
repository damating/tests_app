class TestsController < BaseController
  def index
    render json: Test.where(group_id: params[:group_id]).order(:name)
  end

  def create
    test = Test.new(test_params)
    test.duration_in_secs *= 60
    test.save

    render json: test
  end

  def show
    render json: Test.find(params[:id])
  end

  def destroy
    render json: Test.destroy(params[:id])
  end

  def to_solve
    test = Test.find(params[:id]).as_json(include: {
                                            questions:
                                            {
                                              include: { question_options: { only: [:id, :answer_text] } },
                                              only: [:id, :text]
                                            }
                                          }, only: [:id, :name, :duration_in_secs] )
    render json: test
  end

  def update
    test = Test.find(params[:id])
    test.update_attributes(test_params)
    respond_with test, json: test
  end

  private

  def test_params
    params[:test][:questions_attributes] = JSON.parse(params[:test][:questions_attributes]).each { |hash|
      hash["question_options_attributes"] = JSON.parse(hash["question_options_attributes"])
    }

    params.require(:test).permit(:id, :name, :description, :duration_in_secs, :start_date, :end_date, :group_id,
                                 questions_attributes: [:id, :text, :test_id,
                                 question_options_attributes: [:id, :answer_text, :is_correct, :question_id]])
  end
end
