require "yaml"

Dir.chdir(File.join(Rails.root, "app", "data"))
Dir.foreach(".") do |item|
  # Skip parent and current directories
  next if item ==  "." || item == ".."

  data = YAML.load(File.read(item))

  puts data

  picture = Picture.create(
    name: item,
    title: data["title"],
    author: data["author"],
    website: data["website"],
  )

  for person in data["people"]
    picture.people.create(
      name: person["name"],
      x0: person["upper"][0],
      y0: person["upper"][1],
      x1: person["lower"][0],
      y1: person["lower"][1],
    )
  end
end