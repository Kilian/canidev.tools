import * as fs from 'fs';
import path from 'path';
import { formatDistanceToNow } from 'date-fns'

import { Outlet } from '@remix-run/react';
import { Link, useLoaderData, useParams, useLocation } from '@remix-run/react';
import { json } from '@remix-run/node'; // or cloudflare/deno
import { Stack, Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Box } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Badge, Grid } from '@mantine/core';
import { IconHome2, IconBrandGithub } from '@tabler/icons';
import { Alert } from '@mantine/core';
import { Space } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';

import { SimpleGrid } from '@mantine/core';
import { Spoiler } from '@mantine/core';
import {
	IconInfoCircle,
	IconAlertCircle,
	IconBrandChrome,
	IconBrandFirefox,
	IconBrandEdge,
	IconBrandSafari,
	IconBrandOpera,
	IconBoxMargin,
	IconList,
	IconAccessible,
	IconReportMedical,
	IconTerminal2,
	IconZoomCode,
	IconBrandJavascript,
	IconBrandNextjs,
	IconAffiliate,
	IconHexagons,
	IconCrosshair,
	IconCode,
	IconGauge,
	IconClock,
	IconUser,
	IconNews,
	IconAt,
} from '@tabler/icons';

export const meta = ({ data }) => {
	const title = `${data.Name} | Can I DevTools?`
	const description = data.Description
	const url = `https://canidev.tools/${data.Slug}/`
	const image = `https://canidev.tools/images/${data.Slug}.png`
	
	return { 
		title,
		description,
		"og:url": url,
		"og:title": title,
		"og:description": description,
		"og:image": image		
	};
};

export function loader({ params }) {
	const filename = path.join('features', params.feature + '.json');
	const file = fs.readFileSync(filename);
	const record = JSON.parse(file);

	return json(record);
}

export default function Feature() {
	const params = useParams();
	const feature = useLoaderData();
	const location = useLocation();	
	
	const icons = {
		CSS: <IconBoxMargin size={30} stroke={2} />,
		Accessibility: <IconAccessible size={30} stroke={1.5} />,
		Audit: <IconReportMedical size={30} stroke={1.5} />,
		Console: <IconTerminal2 size={30} stroke={1.5} />,
		Elements: <IconCrosshair size={30} stroke={2} />,
		JavaScript: <IconBrandNextjs size={30} stroke={1.5} />,
		Network: <IconAffiliate size={30} stroke={1.5} />,
		Other: <IconHexagons size={30} stroke={1.5} />,
		Sources: <IconCode size={30} stroke={1.5} />,
	};
	const colors = {
		CSS: 'red',
		Accessibility: 'pink',
		Audit: 'grape',
		Console: 'violet',
		Elements: 'indigo',
		JavaScript: 'lime',
		Network: 'yellow',
		Other: 'orange',
		Sources: 'green',
	};

	const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`
	return (
		<div className="grid">
			<Box>
				<Box
					sx={(theme) => ({
						
						borderRight: `1px solid ${
							theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[4]
						}`,
					})}
				>
					<Group position="apart">
						<Badge
							radius={0}
							variant="dot"
							size="lg"
							p="md"
							color={colors[feature.Category]}
							styles={{ root: { border: 0 } }}
							sx={theme => ({ borderRight: borderColor(theme) })}
						>
							{feature.Category}
						</Badge>
						<Button
							sx={theme => ({ borderLeft: borderColor(theme) })}
							size="sm"
							variant="subtle"
							radius="sm"
							leftIcon={<IconBrandGithub size={16} />}
							component="a"
							href={`https://github.com/pankajparashar/canidev.tools/edit/main/features/${feature.Slug}.json`}
						>
							Edit
						</Button>
					</Group>
				</Box>
				<Divider />
				<Box
					sx={(theme) => ({
						borderRight: `1px solid ${
							theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[4]
						}`,
					})}
				>
					<Box p="xs">
						<Alert
						    styles={theme => ({
							    title: {
								    marginBottom: 0
							    }
						    })} 
							title={feature.Name}
							color={colors[feature.Category]}
						>
							{feature.Description}
						</Alert>
					</Box>
					<Divider />
					<SimpleGrid cols={5} spacing={0}>
						<Button
							fullWidth={true}
							variant={path.basename(location.pathname) === "chrome" ? "filled": "outline"}
							color={colors[feature.Category]}
							size="sm"
							disabled={!feature.Chrome}
							component={Link}
							to={`/${feature.Slug}/chrome`}
						>
							<IconBrandChrome size={20} />
						</Button>
						<Button
							fullWidth={true}	
							variant={path.basename(location.pathname) === "firefox" ? "filled": "outline"}
							color={colors[feature.Category]}
							size="sm"
							disabled={!feature.Firefox}
							component={Link}
							to={`/${feature.Slug}/firefox`}
						>
							<IconBrandFirefox size={20} />
						</Button>
						<Button
							fullWidth={true}
							variant={path.basename(location.pathname) === "edge" ? "filled": "outline"}
							color={colors[feature.Category]}
							size="sm"
							disabled={!feature.Edge}
							component={Link}
							to={`/${feature.Slug}/edge`}
						>
							<IconBrandEdge size={20} />
						</Button>
						<Button
							fullWidth={true}
							variant={path.basename(location.pathname) === "safari" ? "filled": "outline"}
							color={colors[feature.Category]}
							size="sm"
							disabled={!feature.Safari}
							component={Link}
							to={`/${feature.Slug}/safari`}
						>
							<IconBrandSafari size={20} />
						</Button>
						<Button
							fullWidth={true}
							variant={path.basename(location.pathname) === "opera" ? "filled": "outline"}
							color={colors[feature.Category]}
							size="sm"
							disabled={!feature.Opera}
							component={Link}
							to={`/${feature.Slug}/opera`}
						>
							<IconBrandOpera size={20} />
						</Button>
					</SimpleGrid>
					<Divider />
					<SimpleGrid cols={2} spacing="xs" p="xs">
						<Alert
							styles={theme => ({
								title: {
									marginBottom: 0
								}
							})} 
							title="Last Modified"							
							radius="xs"
							p="xs"
						>
							{formatDistanceToNow(new Date(feature.LastModifiedTime), { addSuffix: true })}
						</Alert>
						<Alert
							styles={theme => ({
							title: {
								marginBottom: 0
							}
						})} 
							title="Author"
							radius="xs"
							p="xs"
						>
							<Anchor variant="link" href={`https://twitter.com/${feature.Author}`}>
								{feature.Author}
							</Anchor>
						</Alert>
						<Alert title="Test Live" radius="xs" p="xs" 
							styles={theme => ({ title: { marginBottom: 0 }})}>
							via <Anchor variant="link" href="https://live.browserstack.com/dashboard">BrowserStack</Anchor>
						</Alert>
							<Alert styles={theme => ({ title: { marginBottom: 0 } })} 
								title="Newsletter"
								radius="xs"
								p="xs"
							>
							<Anchor variant="link" color={"indigo.9"} href={`https://canidevtools.substack.com/p/${feature.Newsletter}`}>
								{feature.Newsletter}
							</Anchor>
						</Alert>
					</SimpleGrid>
					<Divider />
				</Box>
			</Box>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
