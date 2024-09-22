'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { editWidget } from '@/lib/mutaion.actions';
import { IWidget } from '@/typings/types';
import { toHex, toHsla } from 'color2k';
import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Widget from './widget';
import { MotionButton, MotionDiv } from './motion';
import { cardVariants, containerVariants } from '@/lib/constants';

type ColorState = {
	hex: string;
	hsl: string;
};

function hexToHsl(hex: string): string {
	const hsl = toHsla(hex);
	const [h, s, l] = hsl.match(/\d+(\.\d+)?/g) || [];
	return `${h} ${s}% ${l}%`;
}

function isValidHex(color: string): boolean {
	return /^#[0-9A-Fa-f]{6}$/.test(color);
}

const setColorData = (color: string | undefined, dark = false): ColorState => ({
	hex: color ? toHex(`hsl(${color.split(' ').join(', ')})`) : dark ? '#1A1A1A' : '#FFFFFF',
	hsl: color ? color : dark ? hexToHsl('#1A1A1A') : hexToHsl('#FFFFFF'),
});

export default function ColorPicker({
	widget,
	projectId,
}: {
	widget: IWidget | null | undefined;
	projectId: string;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [background, setBackground] = useState<ColorState>(setColorData(widget?.backgroundColor));
	const [primary, setPrimary] = useState<ColorState>(setColorData(widget?.primaryColor));
	const [typography, setTypography] = useState<ColorState>(setColorData(widget?.typographyColor));
	const [radius, setRadius] = useState(widget?.radius || '0.5rem');

	const containerStyle = {
		'--background': background.hsl,
		'--primary': primary.hsl,
		'--typography': typography.hsl,
		'--radius': radius,
	} as React.CSSProperties;

	const handleColorChange = useCallback(
		(setter: React.Dispatch<React.SetStateAction<ColorState>>) => {
			return (color: string) => {
				const hex = color.startsWith('#') ? color : `#${color}`;
				if (!isValidHex(hex)) {
					console.warn('Invalid hex color:', hex);
					return;
				}
				try {
					const hsl = hexToHsl(hex);
					setter({ hex, hsl });
				} catch (error) {
					console.error('Error converting color:', error);
				}
			};
		},
		[]
	);

	const handleSaveWidget = async () => {
		try {
			setIsLoading(true);
			const result = await editWidget({
				backgroundColor: background.hsl,
				primaryColor: primary.hsl,
				typographyColor: typography.hsl,
				radius,
				projectId,
			});
			if (result.success) {
				toast({
					title: result.message,
				});
			} else {
				toast({
					title: result.error,
					variant: 'destructive',
				});
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error('Error saving widget:', error);
		}
	};

	return (
		<>
			<Card className='w-full'>
				<MotionDiv variants={cardVariants} initial='hidden' animate='visible'>
					<CardHeader>
						<CardTitle className='text-2xl'>Customize Your Widget</CardTitle>
						<CardDescription>
							Change the colors of your widget here and get the realtime change in your widget. All
							colors are in HEX format.
						</CardDescription>
					</CardHeader>
				</MotionDiv>
				<CardContent className='flex flex-col md:flex-row gap-8'>
					<MotionDiv
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						className='space-y-4'>
						<MotionDiv variants={cardVariants} className='space-y-1'>
							<Label htmlFor='background-color'>Background Color</Label>
							<ColorPickerPopover
								color={background.hex}
								onChange={handleColorChange(setBackground)}
								id='background-color'
							/>
						</MotionDiv>
						<MotionDiv variants={cardVariants} className='space-y-1'>
							<Label htmlFor='primary-color'>Primary Color</Label>
							<ColorPickerPopover
								color={primary.hex}
								onChange={handleColorChange(setPrimary)}
								id='primary-color'
							/>
						</MotionDiv>
						<MotionDiv variants={cardVariants} className='space-y-1'>
							<Label htmlFor='typography-color'>Typography Color</Label>
							<ColorPickerPopover
								color={typography.hex}
								onChange={handleColorChange(setTypography)}
								id='typography-color'
							/>
						</MotionDiv>
						<MotionDiv variants={cardVariants} className='space-y-1'>
							<Label htmlFor='radius'>Border Radius</Label>
							<Select onValueChange={setRadius} defaultValue={radius}>
								<SelectTrigger id='radius' className='w-full'>
									<SelectValue placeholder='Select radius' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='0'>None</SelectItem>
									<SelectItem value='0.25rem'>Small</SelectItem>
									<SelectItem value='0.5rem'>Medium</SelectItem>
									<SelectItem value='1rem'>Large</SelectItem>
								</SelectContent>
							</Select>
						</MotionDiv>
						<MotionButton variants={cardVariants} disabled={isLoading} onClick={handleSaveWidget}>
							Save
						</MotionButton>
					</MotionDiv>
					<MotionDiv
						variants={cardVariants}
						initial='hidden'
						animate='visible'
						className='w-full p-4 flex items-center justify-center'
						style={containerStyle}>
						<Widget />
					</MotionDiv>
				</CardContent>
			</Card>
		</>
	);
}

function ColorPickerPopover({
	color,
	onChange,
	id,
}: {
	color: string;
	onChange: (color: string) => void;
	id: string;
}) {
	const [inputColor, setInputColor] = useState(color);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputColor(value);
		if (isValidHex(value.startsWith('#') ? value : `#${value}`)) {
			onChange(value);
		}
	};

	const handlePickerChange = (newColor: string) => {
		setInputColor(newColor);
		onChange(newColor);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button id={id} variant='outline' className='w-full justify-start text-left font-normal'>
					<div
						className='w-4 h-4 rounded-full mr-2 border border-border'
						style={{ backgroundColor: color }}
					/>
					{color}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-4'>
				<div className='flex flex-col gap-2'>
					<HexColorPicker color={color} onChange={handlePickerChange} />
					<Input value={inputColor} onChange={handleInputChange} placeholder='Enter hex color' />
				</div>
			</PopoverContent>
		</Popover>
	);
}
