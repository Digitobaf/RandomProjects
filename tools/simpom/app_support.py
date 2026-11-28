"""Developer-only local browser harness. Never shipped as a runtime dependency."""
import argparse, atexit, functools, shutil, tempfile, threading
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

def configure():
    parser=argparse.ArgumentParser()
    parser.add_argument('app_dir',type=Path,help='Complete extracted SimPom folder, including matching assets')
    parser.add_argument('--report-dir',type=Path)
    parser.add_argument('--chromium',default=shutil.which('chromium'))
    args=parser.parse_args();app=args.app_dir.resolve()
    if not (app/'SimPom.html').is_file():parser.error('SimPom.html is missing in app_dir')
    report=args.report_dir or Path(tempfile.mkdtemp(prefix='simpom-review-'))
    report.mkdir(parents=True,exist_ok=True)
    class Handler(SimpleHTTPRequestHandler):
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(app)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    atexit.register(server.server_close);atexit.register(server.shutdown)
    return app,report,'http://127.0.0.1:'+str(server.server_port),args.chromium
