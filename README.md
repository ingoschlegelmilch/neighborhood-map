# Neighborhood Map

Lists an overview of restaurants in my neighborhood area.

# Setup

You have to export an environment variable with the google api key:

    export REACT_APP_GOOGLE_MAPS_API_KEY=<your api key>

# Usage

Like any create react app

    npm start

# Issues

I've tried to focus the filter input immediately after expanding the filter locations area, without success.
I've left the code in there, to show my approach, maybe you've got a hint how to fix this.

## ARIA
According to the reviewer, I should have used menu and menuitem elements for the location filter, but after doing further research on this, I have read that list elements are standard to use now and menuitems are no longer considered best practices.

# Credits

I'm using the [google-maps-react](https://github.com/fullstackreact/google-maps-react) package

