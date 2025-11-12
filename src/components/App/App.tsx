import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [currentSettings, setCurrentSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSettingsChange = (newSettings: ArticleStateType) => {
		setCurrentSettings(newSettings);
	};

	const handleReset = () => {
		setCurrentSettings(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentSettings.fontFamilyOption.value,
					'--font-size': currentSettings.fontSizeOption.value,
					'--font-color': currentSettings.fontColor.value,
					'--container-width': currentSettings.contentWidth.value,
					'--bg-color': currentSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentSettings={currentSettings}
				onSettingsChange={handleSettingsChange}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
