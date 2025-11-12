import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentSettings: ArticleStateType;
	onSettingsChange: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	onSettingsChange,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draftSettings, setDraftSettings] = useState(currentSettings);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const handleApply = () => {
		onSettingsChange(draftSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setDraftSettings(defaultArticleState);
		onReset();
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions as OptionType[]}
						selected={draftSettings.fontFamilyOption}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								fontFamilyOption: selected,
							})
						}
						title='Шрифт'
						placeholder='Выберите шрифт'
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={draftSettings.fontSizeOption}
						onChange={(selected) => {
							setDraftSettings({
								...draftSettings,
								fontSizeOption: selected,
							});
						}}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors as OptionType[]}
						selected={draftSettings.fontColor}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								fontColor: selected,
							})
						}
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
					/>
					<Separator />

					<Select
						options={backgroundColors as OptionType[]}
						selected={draftSettings.backgroundColor}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								backgroundColor: selected,
							})
						}
						title='Цвет фона'
						placeholder='Выберите цвет фона'
					/>

					<Select
						options={contentWidthArr as OptionType[]}
						selected={draftSettings.contentWidth}
						onChange={(selected) =>
							setDraftSettings({
								...draftSettings,
								contentWidth: selected,
							})
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
