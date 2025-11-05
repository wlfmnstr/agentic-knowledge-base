---
name: component-patterns
description: Modern React/component architecture patterns, composition, and best practices
---

# Component Patterns Skill

Expert knowledge for building modern, reusable components with React and similar frameworks.

## Component Design Principles

### Single Responsibility
Each component should do one thing well.

```tsx
// Bad: Component does too much
function UserProfilePage() {
  // Fetching, rendering, form handling all in one
}

// Good: Separated concerns
function UserProfilePage() {
  return (
    <>
      <UserHeader />
      <UserStats />
      <UserContent />
    </>
  );
}
```

### Composition Over Inheritance
Build complex UIs from simple components.

```tsx
// Compose small, focused components
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

// Use them together
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Props Interface Design
Clear, type-safe props.

```tsx
interface ButtonProps {
  // Required props
  children: React.ReactNode;
  onClick: () => void;

  // Optional props with defaults
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;

  // Style customization
  className?: string;

  // Accessibility
  'aria-label'?: string;
}

function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

## TypeScript Patterns

### Component Props Types

```tsx
// Basic props
interface Props {
  title: string;
  count: number;
}

// Props with children
interface PropsWithChildren {
  children: React.ReactNode;
}

// Props with optional children
interface Props {
  title: string;
  children?: React.ReactNode;
}

// Props extending HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

### Discriminated Unions

```tsx
// Different props based on variant
type ButtonProps =
  | { variant: 'link'; href: string; onClick?: never }
  | { variant: 'button'; onClick: () => void; href?: never };

function Button(props: ButtonProps) {
  if (props.variant === 'link') {
    return <a href={props.href}>Link</a>;
  }
  return <button onClick={props.onClick}>Button</button>;
}
```

## Component Patterns

### Compound Components

Components that work together with shared state.

```tsx
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const isActive = context.activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeTab !== id) return null;

  return <div role="tabpanel">{children}</div>;
}

// Usage
<Tabs defaultTab="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="docs">Docs</Tab>
  </TabList>
  <TabPanel id="overview">Overview content</TabPanel>
  <TabPanel id="docs">Docs content</TabPanel>
</Tabs>
```

### Render Props

Pass rendering logic as a prop.

```tsx
interface RenderProps<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

function DataFetcher<T>({
  url,
  render,
}: {
  url: string;
  render: (props: RenderProps<T | null>) => React.ReactNode;
}) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{render({ data, loading, error })}</>;
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={data} />;
  }}
/>
```

### Custom Hooks

Extract reusable logic.

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = React.useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

### Controlled vs Uncontrolled

```tsx
// Controlled: Parent manages state
function ControlledInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

// Uncontrolled: Component manages own state
function UncontrolledInput({ defaultValue }: { defaultValue?: string }) {
  const ref = React.useRef<HTMLInputElement>(null);

  return <input ref={ref} defaultValue={defaultValue} />;
}
```

## Performance Optimization

### Memoization

```tsx
// Memoize expensive computations
function ExpensiveComponent({ data }: { data: Data[] }) {
  const processedData = React.useMemo(
    () => expensiveProcessing(data),
    [data]
  );

  return <div>{/* Use processedData */}</div>;
}

// Memoize components
const MemoizedChild = React.memo(function Child({ value }: { value: string }) {
  return <div>{value}</div>;
});

// Memoize callbacks
function Parent() {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <MemoizedChild value="constant" />;
}
```

### Code Splitting

```tsx
// Lazy load components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

## Accessibility Patterns

### Semantic HTML

```tsx
// Good: Semantic elements
function Article({ title, content }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
}

// Bad: Non-semantic
function Article({ title, content }) {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  );
}
```

### ARIA Attributes

```tsx
function Modal({ isOpen, onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      hidden={!isOpen}
    >
      <h2 id="modal-title">Modal Title</h2>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}
```

### Keyboard Navigation

```tsx
function Dropdown({ items }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        // Select item
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {/* Dropdown implementation */}
    </div>
  );
}
```

## Styling Patterns

### CSS Modules

```tsx
import styles from './Button.module.css';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

### CSS-in-JS

```tsx
import { styled } from 'styled-components';

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'primary' ? 'blue' : 'gray'};
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;
```

### Utility Classes (Tailwind)

```tsx
function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

## Testing Patterns

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled onClick={() => {}}>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Error Boundaries

```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Best Practices

1. **Type everything:** Full TypeScript coverage
2. **Props interface first:** Define types before implementation
3. **Composition:** Small, focused components
4. **Accessibility:** Semantic HTML, ARIA, keyboard support
5. **Performance:** Memoize expensive operations
6. **Testing:** Test user behavior, not implementation
7. **Error handling:** Graceful failures, error boundaries
8. **Documentation:** JSDoc for complex props
9. **Consistency:** Follow established patterns
10. **Readability:** Clear naming, logical structure

## Anti-Patterns to Avoid

❌ **Prop drilling:** Pass props through many levels
✅ **Use Context:** Share state at the right level

❌ **Massive components:** 500+ line components
✅ **Break down:** Extract logical pieces

❌ **Inline functions in JSX:** New function every render
✅ **useCallback:** Memoize callbacks

❌ **Mutating state:** `state.value = newValue`
✅ **Immutable updates:** `setState(newValue)`

❌ **Missing keys:** `items.map(item => <div>...)`
✅ **Unique keys:** `items.map(item => <div key={item.id}>...)`

---

*This skill provides comprehensive component patterns for modern React development. Reference it when building components and component architecture.*
