---
name: visual-consistency
description: Standards for maintaining visual consistency across the project, based on the Supervisor Maintenance module. Covers colors, typography, tables, and spacing.
---

# Visual Consistency Standards

## Purpose
This skill ensures visual consistency across the entire project by enforcing the design language established in the **Supervisor Maintenance** module (`src/pages/supervisor/maintenance`).

**Note:** For specific Material-UI (MUI) component implementations, syntax, and hooks, always refer to the **`mui` skill**, which serves as the source of truth for component logic. This skill focuses on the *visual attributes* (colors, spacing, shapes) to be applied via MUI's `sx` prop or styled components.

## Core Color Palette

Use these specific hex codes to maintain the project's visual identity.

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#476797` | Buttons, Active States, Table Headers, Icons |
| **Primary Dark** | `#3A5478` | Button Hover States |
| **Secondary Blue**| `#A3AED0` | Scrollbar Thumbs, Secondary Icons/Text |
| **Text Dark** | `#1B2559` | Page Titles, Key Headings |
| **Divider/Border**| `#E2E8F0` | Table Borders, Divider Lines |
| **Background Light**| `#F4F7FE` | Scrollbar Tracks, Light Backgrounds |
| **Background Alt**| `#F8F9FF` | Table Row Hover State |
| **White** | `#FFFFFF` | Card/Container Backgrounds |

## Design Tokens

### Shadows
- **Card/Container Shadow:** `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)` (Subtle elevation)

### Border Radius
- **Containers/Cards:** `20px` (e.g., DataGrid wrapper, main content blocks)
- **Controls:** `8px` (Buttons, TextFields, Selects)
- **Scrollbars:** `4px`

### Typography
- **Page Titles:** `variant="h5"`, `fontWeight: 600`, Color: `#1B2559`
- **Table Headers:** `fontWeight: 'bold'`, Color: `#476797`
- **Body Text:** Default MUI font family.

## Component Patterns

### 1. Data Tables (DataGrid)
Tables should follow the `StyledDataGrid` pattern found in `src/pages/supervisor/maintenance/components/StyledDataGrid.tsx`.

- **Container:** Wrapped in a `Paper` with `borderRadius: '20px'` and the standard shadow.
- **Column Headers:** White background, `2px solid #E2E8F0` bottom border.
- **Cells:** `1px solid #E2E8F0` bottom border.
- **Hover Effect:** Rows change to `#F8F9FF` on hover.
- **Footer:** `2px solid #E2E8F0` top border.

### 2. Header Section
Page headers should follow the layout in `src/pages/supervisor/maintenance/components/MaintenanceHeader.tsx`.

- **Layout:** Flexbox with `justifyContent: 'space-between'`.
- **Spacing:** `mb: 4` (Margin bottom 4 units).
- **Actions:** Grouped on the right using `gap: 2`.

### 3. Buttons & Inputs
- **Primary Button:** `bgcolor: '#476797'`, `color: 'white'`, `&:hover { bgcolor: '#3A5478' }`, `borderRadius: '8px'`.
- **Outlined Button:** `borderColor: '#476797'`, `color: '#476797'`, `borderRadius: '8px'`.
- **Text Inputs:** `size="small"`, `borderRadius: '8px'` on the root outline.

## Implementation Example (Combined with MUI Skill)

When creating a new component, use the `mui` skill for the structure and this skill for the values.

```tsx
import { Box, Typography, Button, Paper } from '@mui/material';

// Visual Consistency Values applied via sx
const styles = {
  pageContainer: {
    p: 3, // Standard padding
  },
  headerTitle: {
    color: '#1B2559',
    fontWeight: 600,
    mb: 4,
  },
  mainCard: {
    borderRadius: '20px',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
    p: 2,
  },
  actionButton: {
    bgcolor: '#476797',
    borderRadius: '8px',
    '&:hover': {
      bgcolor: '#3A5478',
    },
  },
};

export const MyPage = () => {
    return (
        <Box sx={styles.pageContainer}>
            <Typography variant="h5" sx={styles.headerTitle}>
                My Page Title
            </Typography>
            <Paper sx={styles.mainCard}>
                {/* Content */}
                <Button variant="contained" sx={styles.actionButton}>
                    Action
                </Button>
            </Paper>
        </Box>
    );
};
```
