<script lang="ts">
  import FamilyNode from './FamilyNode.svelte';
  import type { NodeType } from './types/node-type';

  let familyStructure: NodeType[] = [
    {
      isParent: true,
      name: 'Chris',
      nthChild: 1,
      children: [
        {
          isParent: true,
          name: 'Moe',
          nthChild: 2,
          children: [{ isParent: false, nthChild: 3, name: 'Julie' }],
        },
      ],
    },
    { isParent: false, nthChild: 1, name: 'Anna' },
  ];
</script>

{#each familyStructure as member}
  <FamilyNode {member} />
{/each}
