# open-uri encapsulates all the work of making a HTTP request into the open method
require 'open-uri'
# nokogiri parses the HTML content
require 'nokogiri'
# to read and write JSON
require 'json'

require 'bigdecimal'

url = 'https://www.centralbank.go.ke/public-debt/'
# open and read HTML content at URL (open-url allows access via HTTP request)
content = open(url)
# content parsed using Nokogiri
parsed_content = Nokogiri::HTML(content)

rows = [0,12,24,36,48,60,72,84,96,108,120]

data = { source: 'Central Bank of Kenya', source_url: url, debtdata: [] }

count = 0

rows.each do |row|
    row_data = []
    parsed_content.css('tbody').css("#table_171_row_#{row}").css('td').each do |val|
        row_data.push(val.inner_text)
    end

    year = row_data[0][2..3]
    domestic_debt = BigDecimal.new(row_data[2].gsub(",", ""))/1e6
    external_debt = BigDecimal.new(row_data[3].gsub(",", ""))/1e6
    total_debt = BigDecimal.new(row_data[4].gsub(",", ""))/1e6

    data[:debtdata][count] = { 
        year: year, 
        month: row_data[1], 
        domestic_debt: domestic_debt,
        external_debt: external_debt,
        total_debt: total_debt
    }
    count += 1
end

File.write('debtdata.json', data.to_json)