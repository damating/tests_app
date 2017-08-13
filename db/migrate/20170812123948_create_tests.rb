class CreateTests < ActiveRecord::Migration[5.0]
  def change
    create_table :tests do |t|
      t.string :name
      t.text :description
      t.integer :duration_in_secs
      t.datetime :start_date
      t.datetime :end_date
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
