# open-uri encapsulates all the work of making a HTTP request into the open method
require 'open-uri'
# nokogiri parses the HTML content
require 'nokogiri'
# to read and write JSON
require 'json'

require 'bigdecimal'

url = 'https://www.centralbank.go.ke/annual-gdp/'
# open and read HTML content at URL (open-url allows access via HTTP request)
content = open(url)
# content parsed using Nokogiri
parsed_content = Nokogiri::HTML(content)

rows = parsed_content.css('tbody').css('tr').size

data = { sources: [{ source: 'CBK' , source_url: url }], gdp_data: [] }

count = 0

rows.times do |row|
    row_data = []
    parsed_content.css('tbody').css("#table_149_row_#{row}").css('td').each do |val|
        row_data.push(val.inner_text)
    end

    year = row_data[0]
    gdp_growth = row_data[2].to_f
    # below values are multiplied by 1e6 because the values are based on millions
    nominal_gdp = (BigDecimal.new(row_data[1].gsub(",", ""))*1e6).to_i
    real_gdp = (BigDecimal.new(row_data[3].gsub(",", ""))*1e6).to_i

    data[:gdp_data][row] = { 
        year: year, 
        nominal_gdp: nominal_gdp, 
        gdp_growth: gdp_growth,
        real_gdp: real_gdp
    }
end

File.write('../json/gdp.json', JSON.pretty_generate(data))
File.write('../_data/gdp.json', JSON.pretty_generate(data))