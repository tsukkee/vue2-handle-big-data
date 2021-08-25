srand(0)
TAGS = ['hoge', 'fuga', 'piyo', 'foo', 'bar', 'baz']

0.upto(19999).each do |i|
  puts <<EOS
  {
    id: #{i},
    name: "data#{i}",
    options: {
      tags: [#{TAGS.sample(rand(TAGS.size)).map{|t| "\"#{t}\""}.join(', ')}],
      nickname: "DATA#{i}"
    }
  },
EOS
end
