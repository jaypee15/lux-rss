class Request:
    def send(*args):
        print('sent')


http_request = Request()
Request.send()
