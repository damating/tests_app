class Question < ApplicationRecord
  belongs_to :test, optional: true
  has_many :question_options

  accepts_nested_attributes_for :question_options, reject_if: :all_blank, allow_destroy: true
end
