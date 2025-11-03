# delta-theme

A reusable theme package for the delta.io website, built with Astro and Tailwind.

## Overview

This package contains the underlying theme and plugin configuration used by `delta-site`. The primary goal is to maintain separation of concerns by keeping content and page-specific components separate from theme-specific components. This architecture enables theme upgrades and changes without requiring modifications to the `delta-site` package.

## Features

- 🎨 **Tailwind CSS Integration** - Pre-configured styling system
- 🔍 **Search Integration** - Built-in Pagefind search functionality
- 📝 **Remark Plugins** - Enhanced markdown processing
- 🧩 **Reusable Components** - Common UI components for consistent design
- ⚡ **Astro Optimized** - Built specifically for Astro framework

## Components

The theme provides a comprehensive set of "standard" UI components based on Tailwind 3.

## Usage

Import components from the theme package:

```astro
---
import { Button, Container, Typography } from "delta-theme/components";
---

<Container>
	<Typography variant="h1">Welcome to Delta.io</Typography>
	<Button variant="primary">Get Started</Button>
</Container>
```

## Development

This package is part of the delta.io website monorepo and is not intended for external use. It's designed specifically for the delta.io website.

## Contributing

When making changes to theme components or configurations, ensure they remain generic enough to be reused across different pages while maintaining the delta.io identity.

Also, avoid peer dependencies whenever possible. We should ideally not have to reinstall or reference dependencies of this package in other packages.
