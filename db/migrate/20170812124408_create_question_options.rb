class CreateQuestionOptions < ActiveRecord::Migration[5.0]
  def change
    create_table :question_options do |t|
      t.text :answer_text
      t.boolean :is_correct
      t.references :question, foreign_key: true

      t.timestamps
    end
  end
end
