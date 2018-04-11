# importing required modules
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter#process_pdf
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from cStringIO import StringIO
import os

rsrcmgr = PDFResourceManager()
sio = StringIO()
codec = 'utf-8'
laparams = LAParams()
device = TextConverter(rsrcmgr, sio, codec=codec, laparams=laparams)
interpreter = PDFPageInterpreter(rsrcmgr, device)


# Extract text
def ovulation(filename, wordfind):
	fp = file(filename, 'rb')
	for page in PDFPage.get_pages(fp):
		interpreter.process_page(page)
	fp.close()

	# Get text from StringIO
	text = sio.getvalue()
	lines = text.split('\n')
	words = []
	for line in lines:
		this_words = line.split(' ')
		for word in this_words:
			words.append(word)

	if wordfind in words:
		print filename
# Cleanup
wordfind='my'
directory='.'
print('pdf in which' ,wordfind, 'is found')
for root, dirs, files in os.walk(directory):
    for filez in files:
        if filez.endswith('.pdf'):
            ovulation(filez, wordfind)

'''if "second" in words:
	print("SUCCESS!")

if "prime" not in words:
	print("SUCCESS!")
	'''
device.close()
sio.close()
