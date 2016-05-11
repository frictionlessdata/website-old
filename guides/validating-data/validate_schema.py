from goodtables import processors

datafile = './data.csv'
schemafile = './schema.json'

processor = processors.SchemaProcessor(format='csv',
                                       schema=schemafile)

valid, report, data = processor.run(datafile)

output_format = 'txt'

exclude = ['result_context', 'processor', 'row_name', 'result_category',
           'column_index', 'column_name', 'result_level']

out = report.generate(output_format, exclude=exclude)

print(out)
