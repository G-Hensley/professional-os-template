# React Masonry Grid

A React library that solves the "masonry + drag-drop + vertical scroll" problem that no existing library handles well.

## The Problem

Current solutions each have critical limitations:

| Library | Masonry | Drag-Drop | Vertical Scroll | Dynamic Heights | React-Friendly |
|---------|---------|-----------|-----------------|-----------------|----------------|
| react-grid-layout | ❌ | ✅ | ✅ | ❌ (fixed row heights) | ✅ |
| Muuri | ✅ | ✅ | ❌ | ❌ (absolute positioning fights React) | ❌ |
| CSS columns | ✅ | ❌ | ❌ (expands horizontally) | ✅ | ✅ |
| @dnd-kit | ❌ | ✅ | ✅ | N/A | ✅ |
| Masonry.js | ✅ | ❌ | ✅ | ✅ | ❌ |

**No library provides all five features together.**

## The Solution

A React-first masonry layout component with:

1. **True masonry positioning** - Items fill vertical gaps, creating Pinterest-style layouts
2. **Drag-and-drop reordering** - Users can rearrange items by dragging
3. **Vertical scrolling** - Fixed column count with content overflow scrolling vertically
4. **Dynamic content heights** - Items size to their content naturally
5. **React lifecycle compatibility** - Works with re-renders, state updates, and SSR

## Technical Approach

### Core Architecture

```
┌─────────────────────────────────────────┐
│  MasonryGrid (container)                │
│  - Manages column count (responsive)    │
│  - Handles scroll container             │
│  - Coordinates drag-drop context        │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Column  │ │ Column  │ │ Column  │   │
│  │         │ │         │ │         │   │
│  │ ┌─────┐ │ │ ┌─────┐ │ │ ┌─────┐ │   │
│  │ │Item │ │ │ │Item │ │ │ │Item │ │   │
│  │ └─────┘ │ │ │     │ │ │ └─────┘ │   │
│  │ ┌─────┐ │ │ │     │ │ │ ┌─────┐ │   │
│  │ │Item │ │ │ └─────┘ │ │ │Item │ │   │
│  │ │     │ │ │ ┌─────┐ │ │ │     │ │   │
│  │ │     │ │ │ │Item │ │ │ │     │ │   │
│  │ └─────┘ │ │ └─────┘ │ │ └─────┘ │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

### Key Implementation Details

#### 1. Column-Based Layout (Not Absolute Positioning)

Instead of calculating absolute positions like Muuri, use actual DOM columns:

```tsx
<div className="flex gap-4 overflow-y-auto max-h-[80vh]">
  <div className="flex-1 flex flex-col gap-4">{/* Column 1 items */}</div>
  <div className="flex-1 flex flex-col gap-4">{/* Column 2 items */}</div>
  <div className="flex-1 flex flex-col gap-4">{/* Column 3 items */}</div>
</div>
```

This gives us:
- ✅ Vertical scroll (overflow on flex container)
- ✅ Fixed column count (flex children)
- ✅ Dynamic heights (natural DOM flow)

#### 2. Masonry Algorithm

On mount and when items change, distribute items to columns using "shortest column first":

```ts
function distributeItems(items: Item[], columnCount: number): Item[][] {
  const columns: Item[][] = Array.from({ length: columnCount }, () => []);
  const heights: number[] = Array(columnCount).fill(0);

  for (const item of items) {
    // Find shortest column
    const shortestIndex = heights.indexOf(Math.min(...heights));

    // Add item to that column
    columns[shortestIndex].push(item);
    heights[shortestIndex] += item.height; // Measured via ResizeObserver
  }

  return columns;
}
```

#### 3. Height Measurement

Use `ResizeObserver` to track item heights:

```tsx
function useMeasuredHeight(ref: RefObject<HTMLElement>) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return height;
}
```

#### 4. Drag-Drop with @dnd-kit

Leverage `@dnd-kit` for accessible, performant drag-drop:

```tsx
<DndContext onDragEnd={handleReorder}>
  <div className="flex gap-4">
    {columns.map((column, colIndex) => (
      <SortableContext items={column.map(i => i.id)} key={colIndex}>
        <div className="flex-1 flex flex-col gap-4">
          {column.map(item => (
            <SortableItem key={item.id} id={item.id}>
              {item.content}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    ))}
  </div>
</DndContext>
```

#### 5. Cross-Column Drag

The tricky part - moving items between columns:

```ts
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return;

  const activeColumn = findColumnContaining(active.id);
  const overColumn = findColumnContaining(over.id);

  if (activeColumn === overColumn) {
    // Reorder within column
    reorderInColumn(activeColumn, active.id, over.id);
  } else {
    // Move to different column
    moveToColumn(active.id, activeColumn, overColumn, over.id);
  }

  // Re-run masonry algorithm to rebalance
  redistributeItems();
}
```

## API Design

### Basic Usage

```tsx
import { MasonryGrid, MasonryItem } from '@codaissance/react-masonry-grid';

function Dashboard() {
  const [items, setItems] = useState(initialItems);

  return (
    <MasonryGrid
      columns={{ sm: 1, md: 2, xl: 3 }}
      gap={24}
      maxHeight="80vh"
      onReorder={setItems}
    >
      {items.map(item => (
        <MasonryItem key={item.id} id={item.id}>
          <Card>{item.content}</Card>
        </MasonryItem>
      ))}
    </MasonryGrid>
  );
}
```

### Props

```ts
interface MasonryGridProps {
  children: ReactNode;

  // Responsive column count
  columns: number | { sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };

  // Gap between items (px or Tailwind-style)
  gap?: number | string;

  // Scroll container max height
  maxHeight?: string;

  // Called when items are reordered via drag-drop
  onReorder?: (newOrder: string[]) => void;

  // Disable drag-drop
  dragDisabled?: boolean;

  // Custom drag handle selector
  dragHandle?: string;

  // Animation duration (ms)
  animationDuration?: number;
}

interface MasonryItemProps {
  id: string;
  children: ReactNode;

  // Disable drag for this item
  dragDisabled?: boolean;
}
```

### Persistence

```tsx
// Built-in localStorage persistence
<MasonryGrid
  columns={3}
  persistKey="dashboard-layout"
  onReorder={handleReorder}
>
  {/* items */}
</MasonryGrid>

// Or manual persistence
const [order, setOrder] = useState(() =>
  JSON.parse(localStorage.getItem('layout') ?? '[]')
);

<MasonryGrid onReorder={(newOrder) => {
  setOrder(newOrder);
  localStorage.setItem('layout', JSON.stringify(newOrder));
}}>
  {order.map(id => items.find(i => i.id === id)).map(item => (
    <MasonryItem key={item.id} id={item.id}>
      {item.content}
    </MasonryItem>
  ))}
</MasonryGrid>
```

## Differentiation

### vs react-grid-layout
- True masonry (not grid cells)
- Dynamic heights without configuration
- Simpler API

### vs Muuri
- React-first (not DOM manipulation)
- Works with React state and re-renders
- No absolute positioning issues
- TypeScript-first

### vs CSS columns + custom drag
- Actually works (CSS columns + height constraints = horizontal overflow)
- Maintained, tested library

## Roadmap

### v1.0 - Core
- [ ] Masonry layout with shortest-column-first algorithm
- [ ] Responsive column counts
- [ ] Vertical scrolling with max-height
- [ ] @dnd-kit integration for drag-drop
- [ ] Cross-column dragging
- [ ] ResizeObserver for dynamic heights
- [ ] localStorage persistence option
- [ ] TypeScript support
- [ ] SSR compatible

### v1.1 - Polish
- [ ] Animation customization
- [ ] Drag handle support
- [ ] Keyboard navigation (accessibility)
- [ ] Drop indicators/placeholders

### v2.0 - Advanced
- [ ] Virtualization for large lists
- [ ] Infinite scroll support
- [ ] Column spanning (items take 2+ columns)
- [ ] Pinned items (don't move during reorder)
- [ ] Undo/redo support

## Market Opportunity

- **npm downloads**: react-grid-layout ~500k/week, Muuri ~50k/week
- **GitHub issues**: Both have long-standing issues about masonry + scroll
- **Stack Overflow**: Many questions about this exact problem
- **Target users**: Dashboard builders, Pinterest-style galleries, Kanban alternatives

## Monetization

### Open Source Core
- Free: Basic masonry + drag-drop
- MIT license

### Pro Features (one-time or subscription)
- Virtualization for 1000+ items
- Advanced animations
- Premium support
- Private npm registry access

### Enterprise
- Custom development
- SLA support
- On-prem deployment assistance
