import React, { useState } from 'react';

interface ChapterOutline {
  title: string;
  description: string;
}

interface ChaptersProps {
  chapters: ChapterOutline[];
  onChaptersChange: (chapters: ChapterOutline[]) => void;
}

const Chapters: React.FC<ChaptersProps> = ({ chapters, onChaptersChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const MAX_CHAPTERS = 15;




  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditTitle(chapters[index].title);
    setEditDescription(chapters[index].description);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editTitle.trim() && editDescription.trim()) {
      const updatedChapters = [...chapters];
      updatedChapters[editingIndex] = {
        title: editTitle.trim(),
        description: editDescription.trim()
      };
      onChaptersChange(updatedChapters);
      setEditingIndex(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleDelete = (index: number) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    onChaptersChange(updatedChapters);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleAddChapter = () => {
    if (chapters.length < MAX_CHAPTERS) {
      const newChapter: ChapterOutline = {
        title: `Chapter ${chapters.length + 1}`,
        description: 'Add your chapter description here...'
      };
      onChaptersChange([...chapters, newChapter]);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const updatedChapters = [...chapters];
      const draggedChapter = updatedChapters[draggedIndex];
      updatedChapters.splice(draggedIndex, 1);
      updatedChapters.splice(dropIndex, 0, draggedChapter);
      onChaptersChange(updatedChapters);
    }
    setDraggedIndex(null);
  };

  const moveChapter = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex >= 0 && toIndex < chapters.length) {
      const updatedChapters = [...chapters];
      [updatedChapters[fromIndex], updatedChapters[toIndex]] = 
      [updatedChapters[toIndex], updatedChapters[fromIndex]];
      onChaptersChange(updatedChapters);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Project Chapters</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            {chapters.length}/{MAX_CHAPTERS} chapters
          </span>
          <button
            onClick={handleAddChapter}
            disabled={chapters.length >= MAX_CHAPTERS}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chapters.length >= MAX_CHAPTERS
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            Add Chapter
          </button>
        </div>
      </div>

      {chapters.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 backdrop-blur-xl rounded-lg border border-gray-700/50">
          <p className="text-gray-300 text-lg mb-4">No chapters yet</p>
          <button
            onClick={handleAddChapter}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Create Your First Chapter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              draggable={editingIndex !== index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-lg p-6 shadow-xl transition-all ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${editingIndex === index ? 'ring-2 ring-blue-500' : 'hover:shadow-2xl hover:border-gray-600/50'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">                  {/* Drag Handle */}
                  <div className="flex flex-col gap-1 mt-2 cursor-move">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>

                  {/* Chapter Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center font-semibold text-sm mt-1 border border-blue-500/30">
                    {index + 1}
                  </div>

                  {/* Chapter Content */}
                  <div className="flex-1">
                    {editingIndex === index ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-3 py-2 border bg-gray-700/50 text-gray-100 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Chapter title..."
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border bg-gray-700/50 text-gray-100 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Chapter description..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            disabled={!editTitle.trim() || !editDescription.trim()}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {chapter.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {editingIndex !== index && (
                  <div className="flex flex-col gap-2 ml-4">
                    {/* Move buttons */}                    <div className="flex gap-1">
                      <button
                        onClick={() => moveChapter(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveChapter(index, 'down')}
                        disabled={index === chapters.length - 1}
                        className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Edit and Delete buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Edit chapter"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete chapter"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}      {chapters.length >= MAX_CHAPTERS && (
        <div className="mt-4 p-4 bg-amber-900/20 border border-amber-600/50 rounded-lg backdrop-blur-xl">
          <p className="text-amber-300 text-sm">
            ⚠️ You've reached the maximum limit of {MAX_CHAPTERS} chapters. Delete a chapter to add a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default Chapters;