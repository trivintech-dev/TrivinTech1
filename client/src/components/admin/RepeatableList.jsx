import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button, Field, IconButton, Input, Textarea, Toggle } from "./AdminUI.jsx";

const ItemField = ({ field, value, onChange }) => {
  if (field.type === "textarea") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Textarea
          rows={field.rows || 3}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </Field>
    );
  }

  if (field.type === "list") {
    const asText = Array.isArray(value) ? value.join("\n") : value ?? "";
    return (
      <Field label={field.label} hint={field.hint || "One item per line"}>
        <Textarea
          rows={field.rows || 3}
          value={asText}
          placeholder={field.placeholder}
          onChange={(event) =>
            onChange(
              event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
        />
      </Field>
    );
  }

  if (field.type === "number") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Input
          type="number"
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
        />
      </Field>
    );
  }

  if (field.type === "toggle") {
    return <Toggle checked={Boolean(value)} onChange={onChange} label={field.label} description={field.hint} />;
  }

  return (
    <Field label={field.label} hint={field.hint}>
      <Input
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
};

const RepeatableList = ({ items = [], onChange, fields, newItem, itemTitle, addLabel = "Add item", columns = 2 }) => {
  const list = Array.isArray(items) ? items : [];

  const updateItem = (index, key, value) => {
    const next = list.map((item, idx) => (idx === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const removeItem = (index) => onChange(list.filter((_, idx) => idx !== index));

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addItem = () => {
    const created = typeof newItem === "function" ? newItem() : {};
    onChange([...list, created]);
  };

  const gridClass = columns === 1 ? "grid-cols-1" : "sm:grid-cols-2";

  return (
    <div className="space-y-3">
      {list.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-700 bg-slate-900/30 px-4 py-6 text-center text-sm text-slate-500">
          No items yet. Use the button below to add one.
        </p>
      )}

      {list.map((item, index) => (
        <div key={index} className="rounded-xl border border-slate-700/70 bg-slate-900/40 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-slate-200">
              {itemTitle ? itemTitle(item, index) : `Item ${index + 1}`}
            </span>
            <div className="flex items-center gap-1.5">
              <IconButton icon={ArrowUp} label="Move up" onClick={() => move(index, -1)} />
              <IconButton icon={ArrowDown} label="Move down" onClick={() => move(index, 1)} />
              <IconButton
                icon={Trash2}
                label="Remove"
                onClick={() => removeItem(index)}
                className="hover:border-red-500/50 hover:text-red-400"
              />
            </div>
          </div>
          <div className={`grid gap-4 ${gridClass}`}>
            {fields.map((field) => (
              <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
                <ItemField
                  field={field}
                  value={item[field.name]}
                  onChange={(value) => updateItem(index, field.name, value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" icon={Plus} onClick={addItem} type="button">
        {addLabel}
      </Button>
    </div>
  );
};

export default RepeatableList;
