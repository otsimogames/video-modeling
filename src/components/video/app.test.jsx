import Video from './app.jsx';
import {shallow, render} from 'enzyme';
// airbnb testing utility.

import register from 'ignore-styles'
register(['.sass', '.scss'])

describe('<Video />', () => {
	it('component should render correctly', () => {
		const vid = render(<Video id="1" slug="1-1-1"/>);
		console.log(vid);
	});
});
