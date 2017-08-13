class Test < ApplicationRecord
  belongs_to :group
  has_many :questions, dependent: :destroy
  has_many :question_options, through: :questions

  accepts_nested_attributes_for :questions, reject_if: :all_blank
end
