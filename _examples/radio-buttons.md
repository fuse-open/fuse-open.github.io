---
layout: example
title: Radio buttons
synopsis: Using the Selection API to create a set of radio buttons
date: 2016-12-15 00:00:00
tags:
- Custom control
- Selection
uxConcepts:
- Selection
- WhileSelected
- ToggleSelection
- Scale
preview-image: radio-buttons.png
preview-video: n7ix4k0-htY
---
This example illustrates how you can build a custom radio button control using `Selection` and `Selectable`.
When `Selected`, each button sets the value of an `Attractor`, which in turn changes the background color. The `Attractor` is used to make a smooth transition between colors.

```
<App>
	<iOS.StatusBarConfig Style="Light" />

	<Rectangle ux:Class="SelectableRectangle" Width="35" Height="35" CornerRadius="2" Color="{Property SelectionColor}">
		<string ux:Property="ID" />
		<float4 ux:Property="SelectionColor" />
		<Rectangle ux:Dependency="backgroundRect" />

		<Selectable Value="{ReadProperty ID}"/>

		<Attractor ux:Name="colorAttractor" Target="backgroundRect.Color" Value="#fff" Type="Easing" Duration="0.2" DurationExp="0" />
		<Selected>
			<Set colorAttractor.Value="{Property SelectionColor}" />
		</Selected>
		
		<WhileSelected>
			<Scale Factor="1.3" Duration="0.5" Easing="BackOut" EasingBack="BackIn" />
		</WhileSelected>

		<Clicked>
			<ToggleSelection />
		</Clicked>
	</Rectangle>
	
	<StackPanel Alignment="Center" ItemSpacing="20" Padding="20">
		<Rectangle Layer="Background" Color="White" CornerRadius="3" />
		<Selection MaxCount="1" MinCount="1"/>
		<SelectableRectangle ID="1" SelectionColor="#AB47BC" backgroundRect="background" />
		<SelectableRectangle ID="2" SelectionColor="#EC407A" backgroundRect="background" />
		<SelectableRectangle ID="3" SelectionColor="#7986CB" backgroundRect="background" />
		<SelectableRectangle ID="4" SelectionColor="#64B5F6" backgroundRect="background" />
	</StackPanel>

	<Rectangle ux:Name="background" Color="#fff"/>
</App>
```
