import { LayoutGrid, Plus } from 'lucide-react'
import CategoryCard from '../CategoryCard/CategoryCard'
import EmptyState from '../EmptyState/EmptyState'
import './CategoryGrid.css'

export default function CategoryGrid({
  categories,
  wordCountFor,
  onOpenCategory,
  onCreateCategory,
  onRenameCategory,
  onDeleteCategory,
}) {
  if (categories.length === 0) {
    return (
      <EmptyState
        icon={LayoutGrid}
        title="No categories yet"
        description="Create your first category to start building your personal IELTS vocabulary — School, Travel, Business, or anything you're studying."
        action={
          <button className="btn btn-primary" onClick={onCreateCategory}>
            <Plus size={16} strokeWidth={2} /> Create category
          </button>
        }
      />
    )
  }

  return (
    <div className="category-grid">
      <div className="category-grid__header">
        <div>
          <h1 className="category-grid__title">Your categories</h1>
          <p className="category-grid__subtitle">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'} · everything
            saves automatically
          </p>
        </div>
        <button className="btn btn-primary category-grid__cta" onClick={onCreateCategory}>
          <Plus size={16} strokeWidth={2} /> New category
        </button>
      </div>

      <div className="category-grid__list">
        {categories.map((category, i) => (
          <CategoryCard
            key={category.id}
            category={category}
            wordCount={wordCountFor(category.id)}
            onOpen={onOpenCategory}
            onRename={onRenameCategory}
            onDelete={onDeleteCategory}
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
