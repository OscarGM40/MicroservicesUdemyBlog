#! /bin/bash
gnome-terminal --tab -- sh -c "cd client && npm start; exec bash"
gnome-terminal --tab -- sh -c "cd comments && npm start; exec bash"
gnome-terminal --tab -- sh -c "cd event-bus && npm start; exec bash"
gnome-terminal --tab -- sh -c "cd moderation && npm start; exec bash"
gnome-terminal --tab -- sh -c "cd posts && npm start; exec bash"
gnome-terminal --tab -- sh -c "cd query && npm start; exec bash"
