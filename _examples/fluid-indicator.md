---
layout: example
title: Fluid indicator
synopsis: Playing with Layouts, Shapes and masl to implement an fancy indicator.
date: 2022-02-10 00:00:00
tags:
- Indicator
uxConcepts:
- Image
- Mask
- Circle
- Panels
- Rectangle
- Color
preview-image: fluid-indicator.png
preview-video: hYGzk-BcmdE
---
This time we've implemented an awesome indicator.

## Description

This example displays an indicator with a fancy look and feel. The fill inside has a "fluid" with nice waves effect.

## Static implementation
```xml
<Circle Size="100" Color="Black">
	<Stroke Width="4" Color="#00c000"/>
	<Circle Size="84">
		<Mask File="whiteCircle.png" Mode="Alpha" />
		<Rectangle Layer="Background" Size="150%" CornerRadius="50" Color="#00ca00" Y="45">
			<WhileEnabled>
				<Spin Frequency=".2"/>
			</WhileEnabled>
			<Shadow Color="#00ff00" Size="20" Distance="0" />
		</Rectangle>
	</Circle>
	<Text Value="50%" Alignment="Center" FontSize="24" Layer="Overlay" Color="#00ff00"/>
</Circle>
```

The code above shows the whole mark-up of the indicators implementation. It consist of the black circle with green stroke.
This outer circle contains the smaller circle that masked by the `png` image using `Mode="Alpha"`.

The waves effect achived by spinning the rectangle with rounded corners. Glow effect is a simple shadow.

The level of liquid is controling by the value of the `Y` property of the `Rectangle`.

Speed of spin can be chaged via `Frequency` property of the `<Spin />`.

## Dynamic implementation

The dynamic changing of the indicator's appearance will looks like this

```xml
<Circle ux:Class="FluidIndicator" Size="{ReadProperty Diameter}" Color="Black">
	<int ux:Property="Diameter"/>
	<float ux:Property="Max"/>
	<float ux:Property="Value"/>
	<float4 ux:Property="Color"/>
	<float4 ux:Property="TextColor"/>

	<Stroke Width="4" Color="{ReadProperty Color} * 0.9"/>
	<Circle Size="84">
		<Mask File="whiteCircle.png" Mode="Alpha" />
		<Rectangle Layer="Background" 
			Size="175%"
			CornerRadius="40"
			Color="{ReadProperty Color}"
			Opacity=".8"
			Y="{ReadProperty Diameter} * (1 - {ReadProperty Value} / {ReadProperty Max})">
			<WhileEnabled>
				<Spin Frequency=".2"/>
			</WhileEnabled>
			<Shadow Color="{ReadProperty Color}" Size="20" Distance="0" />
		</Rectangle>
	</Circle>
	<Text Value="{ReadProperty Value}%"
		Alignment="Center"
		FontSize="24"
		Layer="Overlay"
		Color="{ReadProperty TextColor}"/>
</Circle>
```

I'm pretty sure that there is nothing to explain. Everything is obvious.

## Usage

Usage of the indicator can be like 

```xml
<StackPanel Alignment="Center" Width="200">
	<Slider Name="sl" Alignment="Top" Minimum="0" Maximum="100" Value="0" UserStep="1"/>
	<FluidIndicator Diameter="100" Max="100" Value="{Property sl.Value}" Color="#0f0" TextColor="Red"/>
</StackPanel>
```

That's it. Hope you enjoyed this journey!

## Full code
```xml
<App Background="#000">
    
    <!-- Static Indicator -->
    <!-- <Circle Size="100" Color="Black">
        <Stroke Width="4" Color="#00c000"/>
        <Circle Size="84">
            <Mask File="whiteCircle.png" Mode="Alpha" />
            <Rectangle Layer="Background" Size="150%" CornerRadius="50" Color="#00ca00" Y="45">
                <WhileEnabled>
                    <Spin Frequency=".2"/>
                </WhileEnabled>
                <Shadow Color="#00ff00" Size="20" Distance="0" />
            </Rectangle>
        </Circle>
        <Text Value="50%" Alignment="Center" FontSize="24" Layer="Overlay" Color="#00ff00"/>
    </Circle> -->


    <!-- Dynamic Indicator -->
    <Circle ux:Class="FluidIndicator" Size="{ReadProperty Diameter}" Color="Black">
        <int ux:Property="Diameter"/>
        <float ux:Property="Max"/>
        <float ux:Property="Value"/>
        <float4 ux:Property="Color"/>
        <float4 ux:Property="TextColor"/>

        <Stroke Width="4" Color="{ReadProperty Color} * 0.9"/>
        <Circle Size="84">
            <Mask File="whiteCircle.png" Mode="Alpha" />
            <Rectangle Layer="Background" 
                Size="175%"
                CornerRadius="40"
                Color="{ReadProperty Color}"
                Opacity=".8"
                Y="{ReadProperty Diameter} * (1 - {ReadProperty Value} / {ReadProperty Max})">
                <WhileEnabled>
                    <Spin Frequency=".2"/>
                </WhileEnabled>
                <Shadow Color="{ReadProperty Color}" Size="20" Distance="0" />
            </Rectangle>
        </Circle>
        <Text Value="{ReadProperty Value}%"
            Alignment="Center"
            FontSize="24"
            Layer="Overlay"
            Color="{ReadProperty TextColor}"/>
    </Circle>

    <!-- Usage -->
    <StackPanel Alignment="Center" Width="200">
        <Slider Name="sl" Alignment="Top" Minimum="0" Maximum="100" Value="0" UserStep="1"/>
        <FluidIndicator Diameter="100" Max="100" Value="{Property sl.Value}" Color="#0f0" TextColor="Red"/>
    </StackPanel>
</App>

```