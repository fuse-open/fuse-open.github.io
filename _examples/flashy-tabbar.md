---
layout: example
title: Flashy tabbar
synopsis: Playing with Layouts and ScrollView to implement a tabbar.
date: 2021-10-29 00:00:00
tags:
- Tabs
- Menu
uxConcepts:
- Image
- ScrollView
- Circle
- Panels
preview-image: flashy-tabbar.png
preview-video: Z6kRYLp-B-I
---
This time we've implemented an awesome [flashy tabbar concept](https://dribbble.com/shots/5660844-Flashy-Tab-Bar-Open-Source) by [Cuberto](https://dribbble.com/cuberto).

## The flashy tabbar

>**Note:**This impementation of a tabbar is not the 100% equal to original one, but quite close.

This example displays a tabbar with a fancy look and feel. When you click on one of the tabs, the circle grow and disapear making an pulse effect. The icon of the selected tab start moving to the top and hides outside the tabbar. In same time, the tab's title moving in the same direction and become visible, and, after small delay the small dot grow at the bottom.

## The composition

Lets look on the source gif and recognise all parts that we need to implement step by step.

- White container with round bottom corners
- 4 tabs with icons and titles
- Pulse animation of the circle when we click on tab
- Set of effects which appears when the tab selected: 
	- Scrolling up the icon and a title
	- Growing of the dot below the title
	- Overlapping the icon by a shape with the color of the tabbar's background

## Initial setup

Lets setup a workspace and some resources that we need for further.
First of all we need to tell Fuse that we want to include our images for tabs icons as a part of a `Bundle`.
So go to the `.unoproj` file and add `"**.png:Bundle"` into section `Includes`.

```json
{
  "Packages": [
    "Fuse",
    "FuseJS"
  ],
  "Includes": [
    "*",
    "**.png:Bundle"
  ]
}
```

This allows us to use relative path to the image `Assets/image.png`.
>**Note** Don't forget to place the `Assets` folder in the project folder.

Next, go to the `MainView.ux` and define color resources for accent and background colors. Than place `ClientPanel`
container and set `Color="{Resource AccentColor}"`. 

```xml
<App>

	<float4 ux:Global="AccentColor" ux:Value="#1E1E6E" />
	<float4 ux:Global="BarBgColor" ux:Value="#fff" />

	<ClientPanel Color="{Resource AccentColor}">
		<!-- tabbar will be here soon -->
	</ClientPanel>
</App>
```

## White container with round bottom corners

As we can see from the *.gif, the tabs inside the container align horizontally and place in a line. So we need
a `StackPanel` with `Orientation="Horizontal"`. Lets place it inside our `ClientPanel`.

```xml
<StackPanel Orientation="Horizontal">
	<Rectangle Layer="Background" Color="{Resource BarBgColor}" CornerRadius="0,0,15,15"/>
</StackPanel>
```

`StackPanel`, by default, don't have background. This means we need add it. The background has a white color and rounded corners.
The best shape for that is a `Rectangle`. It has both needed properties: `Color` and `CornerRadius`. `Color` we will take from resource, and the
`CornerRadius` for bottom corners lets set equal to 15.

>**Note** We dont want that our rectangle be computed as a child of the `StackPanel` (as a default behaviour). To prevent this, we need to set
property `Layer` to `Background`.

Now the panel fills the whole screen, so we need to add a bit of cosmetic settings. Lets set space between the tabs by `ItemSpacing="15"`, set tabbar height by `Height="50"`, place it at the bottom of the screen by `Alignment="BottomCenter"`, add a free space around by `Margin="10"` and a
bit space inside by `Padding="15, 0"`.

```xml
<StackPanel Orientation="Horizontal" ItemSpacing="15" Height="50" Alignment="BottomCenter" Margin="10" Padding="15, 0">
	<Rectangle Layer="Background" Color="{Resource BarBgColor}" CornerRadius="0,0,15,15"/>

	<!-- tabs will be here -->

</StackPanel>
```

## Tabs with icons and titles

What's the tab bar without tabs? Each of them consisnt of an icon, title and a small dot. They are place one below another.
Technically, tab consist of two blocks(icon and title with a dot), so they should placed inside two panels. The title will have accent color.

```xml
<StackPanel HitTestMode="LocalBoundsAndChildren">
	<Panel Height="50">
		<Image Alignment="Center" Size="24" />
	</Panel>
	<StackPanel Alignment="Center" ItemSpacing="5" Height="50">
		<Text Color="{Resource AccentColor}"/>
		<Circle ux:Name="dot" Size="0" Color="{Resource AccentColor}"/>
	</StackPanel>
</StackPanel>
```

To make it visible, lets add an image and a text. 

```xml
<StackPanel HitTestMode="LocalBoundsAndChildren">
	<Panel Height="50">
		<Image Alignment="Center" Size="24" File="Assets/Events.png"/>
	</Panel>
	<StackPanel Alignment="Center" ItemSpacing="5" Height="50">
		<Text Color="{Resource AccentColor}" Value="Events"/>
		<Circle ux:Name="dot" Size="0" Color="{Resource AccentColor}"/>
	</StackPanel>
</StackPanel>
```
For now it's ok that visible only icon.

## Scrolling up the ison and a title

To achive a scrolling effect, the tab should be placed inside the scrollview. Scrolling must be called progammatically by clicking and user not
be able to scroll manually. To prevent user from scrolling we set property `UserScroll="false"`. To make a tab clickable add `Clicked` trigger and
set `HitTestMode="LocalBoundsAndChildren"` to make the whole tab clickabel. Finally, lets allow only vertical scroll direction (just to be sure
that it will looks good) by setting the property `AllowedScrollDirections="Vertical"`.

```xml
<ScrollView ux:Name="scroll" UserScroll="false"	AllowedScrollDirections="Vertical">
	<StackPanel ux:Name="tab" HitTestMode="LocalBoundsAndChildren">
		<!-- tab body -->
		<Clicked>
			<!-- do smth on click -->
		</Clicked>
	</StackPanel>
</ScrollView>

```
For testing that "scroll-by-click" really works, lets add to `Clicked` the `ScrollTo` action.

```xml
<Clicked>
	<ScrollTo Target="scroll" RelativePosition="1" />
</Clicked>
```

After clicking on a tab, the icon will be changed to the text. But it is not exactly what we want.

## Make tabs selectable

One tab is good, but many tabs better. Cause we have several of them, and technically they equal, the best solution would be create a reusable
class. Lets call it `TabBarItem`. Root item could be a `Panel`. In addition we need to create two string properties for the icon file path and
for the title text, and bind to related attributes by `{ReadProperty this.XXX}` expression.

```xml
<Panel ux:Class="TabBarItem">
	<string ux:Property="IconFilePath"/>
	<string ux:Property="Title"/>

	<ScrollView ux:Name="scroll" UserScroll="false"	AllowedScrollDirections="Vertical">
		<StackPanel ItemSpacing="10" Alignment="Top" Width="100%" HitTestMode="LocalBoundsAndChildren">
			<Image ux:Name="icon" File="{ReadProperty this.IconFilePath}" Alignment="Center" Size="24"/>
			<StackPanel Alignment="Center" ItemSpacing="5" Height="50">
				<Text Value="{ReadProperty this.Title}" Color="{Resource AccentColor}"/>
				<Circle ux:Name="dot" Size="0" Color="{Resource AccentColor}" Anchor="50%,50%"/>
			</StackPanel>
			<Clicked>
			</Clicked>
		</StackPanel>
	</ScrollView>
</Panel>
```

Next, we can use our class to create the needed tabs and place them inside the container.

```xml
<ClientPanel Color="{Resource AccentColor}">
	<StackPanel Orientation="Horizontal" ItemSpacing="15" Height="50" Alignment="BottomCenter" Margin="10" Padding="15, 0">
		<Rectangle Layer="Background" Color="{Resource BarBgColor}" CornerRadius="0,0,15,15"/>

		<TabBarItem IconFilePath="Assets/Events.png" Title="Events"  />
		<TabBarItem IconFilePath="Assets/Search.png" Title="Search" />
		<TabBarItem IconFilePath="Assets/Highlights.png" Title="Actions" />
		<TabBarItem IconFilePath="Assets/Settings.png" Title="Settings" />
	</StackPanel>
</ClientPanel>
```

To make our tabs selectable, we need to add `Selectable` component to the `TabBarItem` class
>**Note** If the `Value` property of the `Selectable` component not be setted, the selection functionality won't work at all.
> For this you can use any property that can guarantee uniqueness of the tab. In our case it is `Title` and `IconFilePath`. Lets take `Title`.

```xml
<Panel ux:Class="TabBarItem">
		<string ux:Property="IconFilePath"/>
		<string ux:Property="Title"/>

		<Selectable Value="{ReadProperty this.Title}"/>
		
		<!-- rest markup -->

		<Clicked>
			<ToggleSelection />
		</Clicked>
```

and the `Selection` component to its parent. According to original gif we know that only one tab can be selected, we need to prevent multiple
selectio. For that we set property `MaxCount=1` o the `Selection` component. 

```xml
<!-- rest markup -->
<Rectangle Layer="Background" Color="{Resource BarBgColor}" CornerRadius="0,0,15,15"/>
<Selection MaxCount="1"/>
<!-- rest markup -->
```

To visualize some how that the tab was selected we can use the `WhileSelected` trigger. Inside it we place our `ScrollTo` action from above.

```xml
<Panel ux:Class="TabBarItem">
		<string ux:Property="IconFilePath"/>
		<string ux:Property="Title"/>

		<Selectable Value="{ReadProperty this.Title}"/>

		<WhileSelected>
			<ScrollTo Target="scroll" RelativePosition="1" />
		</WhileSelected>
		<!-- rest -->
```
Nice, but even when the tab change state to deselected (after clicking on the other tab) the visual appearence stay the same. It's because we don't
have a trigger that will be activated when the tab become deselected. Lets add one more `WhileSelected` trigger but set its `Invert` property to `True`. Inside it place the `ScrollTo` action with `RelativePosition="0"`.

```xml
<!-- rest -->
<WhileSelected Invert="true">
	<ScrollTo Target="scroll" RelativePosition="0" />
</WhileSelected>
<!-- rest -->
```

## Tune up

Technically we achive almost everything. Now it's time to polish a bit look and feel.

### Bounce effect of the scrolling

If we look closer, we can see the bouncing effect after scrolling. As we don't need such behaviour, lets remove it. By adding a `ScrollViewMotion`
component to the `ScrollView` we can change the default behaviour. For make a snap smooth set property `GotoType="SmoothSnap"`, to remove the
bounce effect set property `SnapDuration="0"`, to make scrolling a bit faster set `GotoDuration="0.3"` and, finally, to make the scroll animation
feels more naturally set property `GotoEasing="CubicInOut"`.

```xml
	<!-- rest -->
<ScrollView ux:Name="scroll" UserScroll="false" AllowedScrollDirections="Vertical">
	<ScrollViewMotion GotoType="SmoothSnap" SnapDuration="0" GotoDuration="0.3" GotoEasing="CubicInOut"/>
	<!-- rest -->	
```

### Growing of the dot below the title

This dot is the `Circle` that placed below the title. To make it bigger (initial size is 0) when the tab become selected, let use `Change` animator
and animate the circle's propery `Size="5"`. For that we need to set the name of the circle by setting property `ux:Name="dot"`.
The `Change` animator must be placed inside **non-inverted** `WhileSelected` trigger. `Duration` of the growing animation let be equl to `0.2`sec. Because the scrolling is not instance process, we can not see the animation right after it start, so we need to set a small `Delay`,
for example `0.2`sec.

```xml
<WhileSelected>
	<!-- rest -->
	<Change dot.Size="5" Duration=".2" Delay="0.2" Easing="CubicIn"/>
	<!-- rest -->
```
and

```xml
<Circle ux:Name="dot" Size="0" Color="{Resource AccentColor}" Anchor="50%,50%"/>
```

### Pulse animation of the circle when we click on tab

To make an pulse effect lets take a `Circle` and place it at the bottom of a root of our `TabBarItem` class(right under the closing tag of the `ScrollView`). The initial `Size` have to be `0`, the `ux:Name` is `pulse` and `Alignment` is `Center`. Beside, our pulse should be as a wave on the
water surface. This mean, circle have to have only a `Stroke` with the `Width="3"` and `Color="{Resource AccentColor}"`.

```xml
	</ScrollView>

	<Circle ux:Name="pulse" Size="0" Layer="Overlay" Alignment="Center">
		<Stroke Width="3" Color="{Resource AccentColor}"/>
	</Circle>
</Paanel>
```

To make our `Circle` lets add a few `Change`'s to the `Clicked`. `Duration` can be `0.2`sec. The maximum `Size` value equla to `80%` of the parents
size (that would be enough). Because we not need a backward animation of the pulse on deselection, lets set `DurationBack` to `0`. Changing
`Opacity` to `0` during growing, makes the look and feel nicer. 

```xml
<Clicked>
	<ToggleSelection />
	<Change pulse.Size="80%" Duration=".2" DurationBack="0"/>
	<Change pulse.Opacity="0" Duration=".2" DurationBack="0"/>
</Clicked>
```

### Overlapping the icon by a shape with the color of the tabbar's background

For overlapping effect we will use a `Circle`. Again. Lets create a panel and move inside it our icon and this `Circle`. To follow the consistency,
set to `Panel`'s `Height` value equal to `50`. Set `ux:Name="circle"` to overlapper. Align it to a left-bottom corner and make a small offset to the same direction, because without it the small piece of some icons will be visible (not good).

```xml
<StackPanel ItemSpacing="10" Alignment="Top" Width="100%" HitTestMode="LocalBoundsAndChildren">
	<Panel Height="50">
		<Image ux:Name="icon" File="{ReadProperty this.IconFilePath}" Alignment="Center" Size="24">
			<Circle ux:Name="circle" Size="0" Color="{Resource BarBgColor}" Layer="Overlay" Alignment="BottomLeft" Offset="-5,5"/>
		</Image>
	</Panel>
	<!-- rest -->
```

As we did before, add a `Change` to the `WhileSelected`

```xml
<Change circle.Size="40" Duration=".3" />
```

The effect looks better in deselection phase.

That's it. Hope you enjoyed this journey!

## Full code here
```xml
<App>

	<float4 ux:Global="AccentColor" ux:Value="#1E1E6E" />
	<float4 ux:Global="BarBgColor" ux:Value="#fff" />

	<Panel ux:Class="TabBarItem">
		<string ux:Property="IconFilePath"/>
		<string ux:Property="Title"/>

		<Selectable Value="{ReadProperty this.Title}"/>

		<WhileSelected>
			<ScrollTo Target="scroll" RelativePosition="1" />
			<Change dot.Size="5" Duration=".2" Delay="0.2" Easing="CubicIn"/>
			<Change circle.Size="40" Duration=".3" />
		</WhileSelected>
		<WhileSelected Invert="true">
			<ScrollTo Target="scroll" RelativePosition="0" />
		</WhileSelected>

		<ScrollView ux:Name="scroll" UserScroll="false"	AllowedScrollDirections="Vertical">

			<ScrollViewMotion GotoType="SmoothSnap"	SnapDuration="0" GotoDuration="0.3"	GotoEasing="CubicInOut"/>	

			<StackPanel ItemSpacing="10" Alignment="Top" Width="100%" HitTestMode="LocalBoundsAndChildren">
				<Panel Height="50">
					<Image ux:Name="icon" File="{ReadProperty this.IconFilePath}" Alignment="Center" Size="24">
						<Circle ux:Name="circle" Size="0" Color="{Resource BarBgColor}"	Layer="Overlay"	Alignment="BottomLeft" Offset="-5,5"/>
					</Image>
				</Panel>
				<StackPanel Alignment="Center" ItemSpacing="5" Height="50">
					<Text Value="{ReadProperty this.Title}" Color="{Resource AccentColor}"/>
					<Circle ux:Name="dot" Size="0" Color="{Resource AccentColor}" Anchor="50%,50%"/>
				</StackPanel>
				<Clicked>
					<ToggleSelection />
					<Change pulse.Size="80%" Duration=".2" DurationBack="0"/>
					<Change pulse.Opacity="0" Duration=".2" DurationBack="0"/>
				</Clicked>
			</StackPanel>
		</ScrollView>
		<Circle ux:Name="pulse"	Size="0" Layer="Overlay" Alignment="Center">
			<Stroke Width="3" Color="{Resource AccentColor}"/>
		</Circle>
	</Panel>

	<ClientPanel Color="{Resource AccentColor}">
		<StackPanel Orientation="Horizontal" ItemSpacing="15" Height="50" Alignment="BottomCenter" Margin="10" Padding="15, 0">
			<Rectangle Layer="Background" Color="{Resource BarBgColor}" CornerRadius="0,0,15,15"/>
			<Selection MaxCount="1"/>
			
			<TabBarItem IconFilePath="Assets/Events.png" Title="Events"  />
			<TabBarItem IconFilePath="Assets/Search.png" Title="Search" />
			<TabBarItem IconFilePath="Assets/Highlights.png" Title="Actions" />
			<TabBarItem IconFilePath="Assets/Settings.png" Title="Settings" />
		</StackPanel>
	</ClientPanel>
</App>

```