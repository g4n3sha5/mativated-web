import { Outlet } from 'react-router-dom';
import { LeftNavigation } from 'pages/matjournal/common/LeftNavigation';
import { ProtectedBaseLayout } from 'components/ui/layouts/ProtectedBaseLayout';

export default function MatJournalLayout() {
  return (
    <ProtectedBaseLayout>
      <div className="bg-[url('assets/images/sam-mgrdichian5.webp')] bg-[center 50%] min-h-screen relative   pl-leftNavWidth flex">
        <LeftNavigation />
        <Outlet />
      </div>
    </ProtectedBaseLayout>
  );
}
