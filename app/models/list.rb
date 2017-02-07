class List < ApplicationRecord
  belongs_to :board

  validates :title, length: { minimum: 1 }

end
