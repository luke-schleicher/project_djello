class Card < ApplicationRecord

  belongs_to :list

  validates :title, length: { minimum: 1 }

  def self.all_by_list_id(list_id)
    Card.where("list_id = ?", list_id)
  end

end
