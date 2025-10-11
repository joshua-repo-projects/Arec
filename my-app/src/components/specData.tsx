'use client'

import { ISpec } from "@/app/(main)/products/typescript.ts/interfaces"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function SpecData({ specs }: { specs: ISpec }) {
    const [activeSpec, setActiveSpec] = useState<string | null>('processor')

    const sections = [
        { key: 'processor', data: specs.processor },
        { key: 'memory', data: specs.memory },
        { key: 'storage', data: specs.storage },
        { key: 'display', data: specs.display },
        { key: 'os', data: specs.os },
    ]

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {sections.map(({ key, data }, idx) => (
                    <div key={key} className={idx !== 0 ? 'border-t border-gray-200' : ''}>
                        <button
                            onClick={() => setActiveSpec(activeSpec === key ? null : key)}
                            className="cursor-pointer w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600">▶</span>
                                {data.title}
                            </span>
                            {activeSpec === key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {activeSpec === key && (
                            <div className="px-5 pb-5">
                                <table className="w-full">
                                    <tbody>
                                        {data.items.map((item, itemIdx) => (
                                            <tr key={itemIdx} className={itemIdx !== 0 ? 'border-t border-gray-100' : ''}>
                                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 align-top">
                                                    {item.label}
                                                </td>
                                                <td className="py-3 text-sm text-gray-900">
                                                    {item.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}