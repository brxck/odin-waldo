require "yaml"

Dir.chdir(Rails.root.join("app", "data"))
Dir.foreach(".") do |item|
  # Skip parent and current directories
  next if [".", ".."].include? item

  data = YAML.load(File.read(item)) # rubocop:disable Security/YAMLLoad

  picture = Picture.create(
    name: item.chomp(".yml"),
    title: data["title"],
    author: data["author"],
    website: data["website"]
  )

  data["people"].each do |person|
    picture.people.create(
      name: person["name"],
      x0: person["upper"][0],
      y0: person["upper"][1],
      x1: person["lower"][0],
      y1: person["lower"][1]
    )
  end
end
