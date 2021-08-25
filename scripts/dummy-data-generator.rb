srand(0)
TAGS = ['hoge', 'fuga', 'piyo', 'foo', 'bar', 'baz']

puts '{'
0.upto(9999).each do |i|
  puts <<EOS
  {
    id: #{i},
    name: "data#{i}",
    tags: [#{TAGS.sample(rand(TAGS.size)).map{|t| "\"#{t}\""}.join(', ')}],
  },
EOS
end
puts '}'
