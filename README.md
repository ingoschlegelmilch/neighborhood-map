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
The last piece that seems to be missing is keyboard navigation for the location filter, but I'm kind of clueless on how to implement this feature in react, as DOM reference isn't an option.

# Credits

I'm using the [google-maps-react](https://github.com/fullstackreact/google-maps-react) package

