	
	 _        ______   ______  _    __              
	| |      / |  | \ | |     | |  / /              
	| |   _  | |  | | | |     | |-< <               
	|_|__|_| \_|__|_/ |_|____ |_|  \_\              
                                                
	 _________   ______    ______   _    _  _______ 
	| | | | | \ | |       / |  | \ | |  | |   | |   
	| | | | | | | |----   | |  | | | |  | |   | |   
	|_| |_| |_| |_|____   \_|__|_/ \_|__|_|   |_|   
	
	by Websecurify (pdp)
	

The following application, written on top of ~~MongoDB~~ Sqlite3 and NodeJS, demonstrates a simple but not too obvious vulnerability in the this particular technology stack that can be used to successfully bypass the login prompt.

# System Requirements

You will need docker installed and fully functional.

# How To Use
    docker build -t lock-me-out:exploitable .
	docker run -p 49090:49090 lock-me-out:exploitable

The application will be available on http://localhost:49090.
