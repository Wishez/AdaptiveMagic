/**********

	Test: 26.10.2017 

***********/


import 'babel-polyfill';

const AM = require('adaptivemagic');

window.addEventListener('load', function() {
	const _getEl = selector => document.querySelector(selector);  
	const $testBlock = _getEl('#testBlock');
	const $testImage = _getEl('#testImage');

	const changeContent = (text, imageSource) => {
		$testBlock.innerHTML = text;
		$testImage.src = imageSource;
	};

	
	AM.doBy(
		{
			name: 'xsToMd',
			min: 800,
			max: 850
		}, 
		() => {
			changeContent(
				'It show content when the screen\'s widht is between 800px and 850px.',
				'https://kilkennycat.files.wordpress.com/2015/10/img_20151009_0002.jpg'
			);
		}
	);
	AM.doBy(
		{
			name: 'mdUp',
			min: 991
		}, 
		() => {
			changeContent(
				'It show content when the screen\'s widht is more than 991px but not 991px.',
				'https://s-media-cache-ak0.pinimg.com/564x/43/42/74/4342743565d9a2dc7f40838db0770cd5.jpg'
			);
		}
	);
	AM.doBy(
		{
			name: 'xxs',
			min: 0,
			max: 450
		}, 
		() => {
			changeContent(
				'It show content when the screen\'s widht is less than 450px, but not 450px.',
				'https://kilkennycat.files.wordpress.com/2016/09/img_20160829_0001-1.jpg?w=656'
			);
		}
	);
	window.addEventListener('resize', function() {
		AM.doBy('lgUp', () => {
			changeContent(
				'Cahnge text by Large screen.',
				'https://www.tattypuss.co.uk/user/products/large/lick-me-denise-laurent-tabby-cat-art.jpg'
			);
		});
		AM.doBy('md', () => {
			changeContent(
				'Cahnge text by Medium screen.',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-MmbVUzhtvPQ9dgMpU3jv68wAvsEFNNxOEU_-sLTBMu4xNQS');
		});
		AM.doBy('sm', () => {
			changeContent(
				'Cahnge text by Small screen.',
				'https://s-media-cache-ak0.pinimg.com/originals/62/68/b7/6268b71095cf60af2402ff9482c3f06b.jpg'
			);
		});
		AM.doBy('xs', () => {
			changeContent(
				'Cahnge text by Extra-small screen.',
				'http://pm1.narvii.com/6370/8fa49a28fdcc44542279d910e8bd1ef0a923043a_hq.jpg'
			);
		});
		AM.doBy('xxs', () => {
			changeContent(
				'Cahnge text by Extra-extra-small screen.',
				'http://catsfineart.com/assets/images/cats/CatPortrait/db_Denise_Laurent711.jpg'
			);
		});
	});
});