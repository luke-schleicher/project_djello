class Board < ApplicationRecord

  belongs_to :owner, class_name: 'User',
                     foreign_key: :user_id

  has_many :lists, dependent: :destroy

  validates :title, length: { minimum: 1 }

end
